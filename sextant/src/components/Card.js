//Created by bash script
import styles from './Card.module.css';

const Card = (props) => {
    const classes = `${styles.Card} ${props.className? props.className : ''}`;
    return (
    <div className={classes} {...props}>
        <h2>
            {props.title}
        </h2>
        {props.children}
    </div>
    ) 
    }
    export default Card;

