var React       = require('react'),
    ImageLoader = require('react-imageloader'),
    Loading     = require('./loading.react');

/**
 * The navigation
 */
var Image = React.createClass({
    render: function() {
        var isImage = this.props.current.type === 'img';
    
        return (
            <div 
                className={isImage ? 'container' : 'hidden'}>
                <ImageLoader 
                    src={isImage ? this.props.current.data : ''}
                    preloader={this._whileLoading}>
                </ImageLoader>
            </div>
        );
    },
    _whileLoading : function() {
        return (
            <Loading />
        );
    }
});

module.exports = Image;
