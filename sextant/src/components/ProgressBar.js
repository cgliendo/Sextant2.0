//Created by bash script
import styles from './ProgressBar.module.css';

const ProgressBar = (props) => {
    const percent = `${props.percent}%`
    const label = props.label !== undefined ? props.label : '';
    const value = props.value !== undefined ? props.value : 'n/a';
    const unit = props.unit !== undefined ? props.unit : '';
    
    const renderLabel = props.label !== undefined? `${label}: ${value}${unit}`:'';

    return (
        <div className={styles.Container}>
            <div className={styles.ProgressBar}>
                <div style={{width: percent}}></div>
            </div>
            {renderLabel}
        </div>
    );
    }
    export default ProgressBar;

