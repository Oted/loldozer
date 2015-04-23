var React       = require('react'),
    jQuery      = require('../../common/jquery.min'),
    gifCount    = 0;

/**
 * The navigation
 */
var Gif = React.createClass({
    render: function() {
        var isGif = this.props.current.type === 'gif' || this.props.current.type === 'gifv';

        if (this.props.current.type === 'gifv') {
            this.props.current.data = this.props.current.data.replace('.gifv', '.gif');
        }

        if (isGif) {
            gifCount++;
        }

        return (
            <div 
                className={isGif ? 'container' : 'hidden'}>
                <img 
                    src={isGif && gifCount % 2 === 0 ? this.props.current.data : ''}
                    className={isGif && gifCount % 2 === 0 ? '' : 'hidden'}>
                </img>
                <img 
                    src={isGif && gifCount % 2 === 1 ? this.props.current.data : ''}
                    className={isGif && gifCount % 2 === 1 ? '' : 'hidden'}>
                </img>
            </div>
        );
    }
});

module.exports = Gif;
