//Created by bash script
import styles from './Clock.module.css';
import { useEffect, useState } from 'react';

const Clock = (props) => {
    // const classes = `${styles.TClock} ${props.className? props.className : ''}`;
    const [date,setDate] = useState(new Date());
    let hour = date.getHours().toString().padStart(2,0);
    let minutes = date.getMinutes().toString().padStart(2,0);
    // console.log(date);
    setTimeout(()=>{
        setDate(new Date());
    },1000);
    

    return (
        <div {...props}>
        <div className={styles.Clock}>
            {hour}<span className={styles.colon}>:</span>{minutes}
        </div>
        <div className={styles.Date}>
            {date.getMonth()+1}/{date.getDate()}/{date.getFullYear()}
        </div>
        </div>
        );
    }
    export default Clock;

