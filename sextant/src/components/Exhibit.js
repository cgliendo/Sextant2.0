//Created by bash script
import styles from './Exhibit.module.css';

const Exhibit = (props) => {
    const classes = `${styles.Exhibit} ${props.className}`
    
    const rails = [[],[],[]];
    props.children.forEach((e,i) => {
        let k = i%3;
        rails[k].push(e);
    });

    return <div className={classes}>
        {props.title && <h2>{props.title}</h2>}
        <div className={styles.Content}>
            <div className={styles.Rail}>{rails[0]}</div>
            <div className={styles.Rail}>{rails[1]}</div>
            <div className={styles.Rail}>{rails[2]}</div>
            {/* {props.children[0]} */}
        </div>
    </div>;
    }
    export default Exhibit;

