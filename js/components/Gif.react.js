var React       = require('react'),
    ImageLoader = require('react-imageloader');

/**
 * The navigation
 */
var Gif = React.createClass({
    render: function() {
        var isGif = this.props.current.type === 'gif';
        
        return (
            <div 
                className={isGif ? '' : 'hidden'}>
                <ImageLoader 
                    src={isGif ? this.props.current.data : ''}
                    preloader={this._whileLoading}>
                </ImageLoader>
            </div>
        );
    },
    _whileLoading : function() {
        return (
            <img
                className={'loading'}
                src={'common/loading.gif'}>
            </img>
        );
    }
});

module.exports = Gif;
