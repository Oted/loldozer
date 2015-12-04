var React       = require('react'),
    LolActions  = require('../actions/LolActions');

/**
 * The navigation
 */
var Gif = React.createClass({
    render: function() {
        if (this.props.current.type === 'gifv') {
            this.props.current.data = this.props.current.data.replace('.gifv', '.gif');
        }

        if (this.props.isMulti) {
            return (
                <div
                    className='scroll-container'>
                    <img className='image-performer' onClick={this._onImageClick}
                        src={this.props.current.data}>
                    </img>
                </div>
            )
        }
 
        return (
            <div 
                className='container' >
                <img
                    src={this.props.current.data}>
                </img>
            </div>
        );
    },

    _onImageClick : function(event) {
        console.log('inspect item');

        LolActions.openModal('inspect', this.props.current);
    }
});

module.exports = Gif;
