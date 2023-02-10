
const IPdisplayTest = (props) => {
    const label = props.ipv6 ? 'IPv6:  ' : 'IPv4: ';
    
    let IPAddress = props.ipv6 ? '2001:0DBB:AC10:FE01::' : '122.124.24.54'
    return (
        <div className='ip-container'>
            {label} 
            {IPAddress}
        </div>
        )
    }
    export default IPdisplayTest;

