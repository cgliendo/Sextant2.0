//Created by bash script
// import styles from './Banner.module.css';
const Banner = (props) => {
    return (
        <header>
            <div>
                <h1>
                    {props.title}
                </h1>
                <div>
                    {/* {Date.now().toLocaleString()} */}
                </div>
            </div>
        </header>
        )
    }
    export default Banner;

