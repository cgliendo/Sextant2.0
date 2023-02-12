import { memo, useEffect, useState, useRef } from "react";
import ProgressBar from "./ProgressBar";
import StatItem from "./StatItem";

const StatisticaPro = (props) => {
	const [renderData, setRenderData] = useState(props.data.current);

	let timeout;
	useEffect(() => {
		// console.log('in useEffect');
		timeout = setInterval(() => {
			console.log("COMPONENT:", props.data.current);
			setRenderData(props.data.current);
		}, 5200);

		return () => clearInterval(timeout);
	});

	let temp_color = renderData.temp_cpu >= 85 ? "warning" : undefined;
	temp_color = renderData.temp_cpu >= 95 ? "danger" : temp_color;

	return (
		<div>
			<h2>{renderData.hostName}</h2>
			<ProgressBar percent={renderData.cpu} label="CPU Load" unit="%" />
			<ProgressBar percent={renderData.gpu} label="GPU Load" unit="%" />
			<ProgressBar percent={renderData.memory} label="Memory" unit="%" />
			<ProgressBar
				percent={renderData.temp_cpu * 0.8}
				value={renderData.temp_cpu}
				type={temp_color}
				label="CPU Temp"
				unit="°C"
			/>
		</div>
	);
};
export default StatisticaPro;
