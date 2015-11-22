var React           = require('react'),
    options         = {
        height: '390',
        width: '640'
    };

var Twitch = React.createClass({
    render: function() {
        return (
            <div 
                key={this.props.data}
                className={this.props.isMulti ? 'scroll-container' : 'container'}>
                {this.props.isMulti ? <iframe 
                    id={'twich' + this.props.current.data}
                    key={'twich' + this.props.current.data}
                    height={options.height} 
                    width={options.width} 
                    frameBorder="0"
                    scrolling="no" 
                    autostart='0'
                    autoplay='false'
                    src={this.props.current.data}>
                </iframe> :
                <iframe 
                    id={'twich' + this.props.current.data}
                    key={'twich' + this.props.current.data}
                    height={options.height} 
                    width={options.width} 
                    frameBorder="0" 
                    scrolling="no" 
                    src={this.props.current.data}>
                </iframe>}
            </div>
        );
    }
});

module.exports = Twitch
