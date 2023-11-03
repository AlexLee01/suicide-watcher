#http://127.0.0.1:5000/?content="Too exhausting Everything got so much worse making suicide look even better for me plus it would be better for others too. Just feel sorry for my cat but no matter what I cant make everyone happy so idk."


#from werkzeug.utils import cached_property
from flask import Flask
from flask import request
from flask import jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

from transformers import pipeline
import random
import torch
import torch.nn as nn
import torch.nn.functional as F
from transformers import BertTokenizer,BertModel
import numpy as np

random.seed(2)
np.random.seed(2)
torch.manual_seed(2)
USE_CUDA = torch.cuda.is_available()
if USE_CUDA:
    torch.cuda.manual_seed(2)
    torch.cuda.manual_seed_all(2)

class ModelConfig:
    batch_size = 20
    output_size = 4
    hidden_dim = 384   #768/2
    n_layers = 2
    lr = 1e-5
    bidirectional = True  #这里为True，为双向LSTM
    # training params
    epochs = 20
    # batch_size=50
    print_every = 10
    clip=5 # gradient clipping
    use_cuda = USE_CUDA
    bert_path = 'C:/Users/Alex/Program/jupyter/bert-base-chinese' #预训练bert路径
    save_path = 'C:/Users/Alex/Program/jupyter/demo/bert_bilstm.pth' #模型保存路径

class bert_lstm(nn.Module):
    def __init__(self, bertpath, hidden_dim, output_size, n_layers, bidirectional=True, drop_prob=0.5):
        super(bert_lstm, self).__init__()

        self.output_size = output_size
        self.n_layers = n_layers
        self.hidden_dim = hidden_dim
        self.bidirectional = bidirectional

        # Bert ----------------重点，bert模型需要嵌入到自定义模型里面
        # self.bert=BertModel.from_pretrained(bertpath)
        # tokenizer = BertTokenizer.from_pretrained("MODEL_NAME")
        self.bert = BertModel.from_pretrained("bert-base-uncased")

        for param in self.bert.parameters():
            param.requires_grad = True

        # LSTM layers
        self.lstm = nn.LSTM(768, hidden_dim, n_layers, batch_first=True, bidirectional=bidirectional)

        # dropout layer
        self.dropout = nn.Dropout(drop_prob)

        # linear and sigmoid layers
        if bidirectional:
            self.fc = nn.Linear(hidden_dim * 2, output_size)
        else:
            self.fc = nn.Linear(hidden_dim, output_size)

        # self.sig = nn.Sigmoid()

    def forward(self, x, hidden):
        batch_size = x.size(0)
        # 生成bert字向量
        x = self.bert(x)[0]  # bert 字向量

        # lstm_out
        # x = x.float()
        lstm_out, (hidden_last, cn_last) = self.lstm(x, hidden)
        # print(lstm_out.shape)   #[32,100,768]
        # print(hidden_last.shape)   #[4, 32, 384]
        # print(cn_last.shape)    #[4, 32, 384]

        # 修改 双向的需要单独处理
        if self.bidirectional:
            # 正向最后一层，最后一个时刻
            hidden_last_L = hidden_last[-2]
            # print(hidden_last_L.shape)  #[32, 384]
            # 反向最后一层，最后一个时刻
            hidden_last_R = hidden_last[-1]
            # print(hidden_last_R.shape)   #[32, 384]
            # 进行拼接
            hidden_last_out = torch.cat([hidden_last_L, hidden_last_R], dim=-1)
            # print(hidden_last_out.shape,'hidden_last_out')   #[32, 768]
        else:
            hidden_last_out = hidden_last[-1]  # [32, 384]

        # dropout and fully-connected layer
        out = self.dropout(hidden_last_out)
        # print(out.shape)    #[32,768]
        out = self.fc(out)

        return out

    def init_hidden(self, batch_size):
        weight = next(self.parameters()).data

        number = 1
        if self.bidirectional:
            number = 2

        if (USE_CUDA):
            hidden = (weight.new(self.n_layers * number, batch_size, self.hidden_dim).zero_().float().cuda(),
                      weight.new(self.n_layers * number, batch_size, self.hidden_dim).zero_().float().cuda()
                      )
        else:
            hidden = (weight.new(self.n_layers * number, batch_size, self.hidden_dim).zero_().float(),
                      weight.new(self.n_layers * number, batch_size, self.hidden_dim).zero_().float()
                      )

        return hidden

def predict(test_comment_list, config):
    net = bert_lstm(config.bert_path,
                    config.hidden_dim,
                    config.output_size,
                    config.n_layers,
                    config.bidirectional)
    net.load_state_dict(torch.load(config.save_path))
    # net.load_state_dict(max_net)
    net.cuda()
    result_comments = pretreatment(test_comment_list)  # 预处理去掉标点符号
    # 转换为字id
    tokenizer = BertTokenizer.from_pretrained("bert-base-uncased")
    result_comments_id = tokenizer(result_comments,
                                   padding=True,
                                   truncation=True,
                                   max_length=512,
                                   return_tensors='pt')
    tokenizer_id = result_comments_id['input_ids']
    # print(tokenizer_id.shape)
    inputs = tokenizer_id
    batch_size = inputs.size(0)
    # batch_size = 32
    # initialize hidden state
    h = net.init_hidden(batch_size)

    if (USE_CUDA):
        inputs = inputs.cuda()

    net.eval()
    with torch.no_grad():
        # get the output from the model
        output = net(inputs, h)
        output = torch.nn.Softmax(dim=1)(output)
        pred = torch.max(output, 1)[1].item()
        #print("pred:", pred) # 0:attempt, 1:behavior, 2:ideation, 3:indicator

    return pred

# 剔除标点符号,\xa0 空格
def pretreatment(comments):
    result_comments = []
    punctuation = '。，？！：%&~（）、；“”&|,.?!:%&~();""'
    for comment in comments:
        comment = comment.replace("[removed]", "")
        comment = ''.join([c for c in comment if c not in punctuation])
        comment = ''.join(comment.strip())  # \xa0
        result_comments.append(comment)

    return result_comments

def num_to_label(s): # s is num type of label
    if s == 3:
        return 'indicator'
    elif s == 2:
        return 'ideation'
    elif s == 1:
        return 'behavior'
    elif s == 0:
        return 'attempt'
    else:
        return "none"

pipe =  pipeline("sentiment-analysis",model="soleimanian/financial-roberta-large-sentiment")
@app.route("/", methods=["GET", "POST"])
def process():
    model_config = ModelConfig()
    comment=None
    if request.method == "GET":
        comment = request.args.get("content")
    if request.method == "POST":
        if request.content_type.startswith('application/json'):
            # comment = request.get_json()["content"]
            comment = request.json.get('content')
        elif request.content_type.startswith('multipart/form-data'):
            comment = request.form.get('content')
        else:
            comment = request.values.get("content")
    r=predict([comment], model_config)
    #r=pipe(comment)
    print(comment)
    print(num_to_label(r))
    #return str(num_to_label(r))
    return jsonify({'result': num_to_label(r)})
if __name__ == '__main__':
    app.run()