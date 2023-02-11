//Created by bash script
import styles from './StatItem.module.css';

const StatItem = (props) => {
    const classes = `${styles.StatItem} ${props.className? props.className : ''}`;
    console.log(props.data);
    return <div className={classes}>hello</div>;
    }
    export default StatItem;

