//Created by bash script
import styles from './ProgressBar.module.css';

const ProgressBar = (props) => {
    const percent = props.percent!==undefined? `${props.percent}`: 0; 
    const label = props.label !== undefined ? props.label : 'n/a';
    const value = props.value !== undefined ? props.value : percent;
    const unit = props.unit !== undefined ? props.unit : '';
    
    const renderLabel = props.label !== undefined? `${label}: ${value}${unit}`:'';

    const altStyle = props.type !== undefined ? props.type : '';
    const percentString = `${percent}%`

    return (
        <div {...props} className={styles.Container}>
            <div className={styles.ProgressBar}>
                <div type={altStyle} style={{width: percentString}}></div>
            </div>
            {renderLabel}
        </div>
    );
    }
    export default ProgressBar;

