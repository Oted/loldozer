var React       = require('react'),
    jQuery      = require('../../common/jquery.min'),
    gifCount    = 0;

/**
 * The navigation
 */
var Gif = React.createClass({
    render: function() {
        if (this.props.isMulti) {
            return (
                <div
                    className='scroll-container'>
                    <img
                        src={this.props.current.data}>
                    </img>
                </div>
            )
        }
 
        if (this.props.current.type === 'gifv') {
            this.props.current.data = this.props.current.data.replace('.gifv', '.gif');
        }

        gifCount++;

        return (
            <div 
                className='container' >
                <img
                    style={{'width' : '100%'}} 
                    src={gifCount % 2 === 0 ? this.props.current.data : ''}
                    className={gifCount % 2 === 0 ? '' : 'hidden'}>
                </img>
                <img 
                    src={gifCount % 2 === 1 ? this.props.current.data : ''}
                    className={gifCount % 2 === 1 ? '' : 'hidden'}>
                </img>
            </div>
        );
    }
});

module.exports = Gif;
