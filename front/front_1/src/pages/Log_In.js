import Log_in from '../conponents/Log_in/Log_in';
import classes from './Log_In.module.css'
function Log_In_Page() {
  return(
    <section>
    <Log_in />
    <div className={classes.rectangle1}></div>
    <div className={classes.rectangle2}></div>
  </section>

  )
  
}
export default Log_In_Page;
