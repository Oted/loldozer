var React           = require('react'),
    options         = {
        height: '390',
        width: '390'
    };

var Vine = React.createClass({
    render: function() {
        if (this.props.isMulti === true) {
            // options.playerVars.autoplay = 0;
        }
        if (document.getElementById('vine-' + this.props.current.data)) {
            if (this.props.isFocus === true) {
                // document.getElementById('vine-' + this.props.current.data).contentWindow.postMessage("scrolledInToView", "*");
            } else {
                // document.getElementById('vine-' + this.props.current.data).contentWindow.postMessage("scrolledOutOfView", "*");
            }
        }

        return (
            <div 
                className={this.props.isMulti ? 'scroll-container' : 'container'}>
                <iframe 
                    key={'vine-' + this.props.current.data}
                    id={'vine-' + this.props.current.data}
                    height={options.height} 
                    width={options.width} 
                    frameBorder="0" 
                    src={this.props.current.data + '/card?audio=0'}>
                </iframe>
            </div>
        );
    }
});

module.exports = Vine;
