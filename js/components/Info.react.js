var React       = require('react'),
    LolActions  = require('../actions/LolActions');

/**
 * The navigation
 */
var Info = React.createClass({
    render: function() {
        if (!this.props.current) {
            return(<div></div>);
        }
        
        var style = {
            width : this.props.experience + '%',
            background : calculateColour(this.props.experience)
        };
        
        var niceExp = parseFloat(this.props.experience).toFixed(1);

        
        return (
            <div
                className={'info'}>
                <div style={style} id={'exp-bar'}>
                    {this.props.experience ? <p id='exp-bar-text'> {niceExp} / 100 </p> : ''}
                </div>
                <h1> {this.props.current ? this.props.current.title : ''} </h1>
                <ul className='info-controls'>
                    <li style={{'color': '#e9a39b'}}>
                        {this.props.current.dislikes || this.props.current.likes ? this.props.current.dislikes : ''}
                    </li>
                    {this.props.current.source && this.props.level >= 4 ? 
                        <li 
                            id='source'>
                            <a className={this._getSourceIcon()} target='_blank' href={this.props.current.source}></a>
                        </li>
                    :''}
                    {this.props.current.source && this.props.level >= 10 ? 
                        <li data-tooltip='Toggle autoplay' onClick={this._toggleAutoplay}>
                            {this.props.autoplay ? 
                                <i className="fa fa-toggle-on fa-2x"></i> : 
                                <i className="fa fa-toggle-off fa-2x"></i>
                            }
                        </li>
                    :''}
                    <li style={{'color': '#89e5b0'}}>
                        {this.props.current.likes || this.props.current.dislikes ? this.props.current.likes : ''}
                    </li>
                </ul>
            </div>
        );
    },

    /**
     *  Toggles the autplay
     */
    _toggleAutoplay : function() {
        LolActions.toggleAutoplay();
    },
    
    _getSourceIcon: function () {
        var s = this.props.current.source_type;

        if (!this.props.current.source) {
            return 'disabled';
        }
    
        switch (s) {
            case "reddit" :
                return "fa fa-reddit fa-2x";
            case "soundcloud" :
                return "fa fa-soundcloud fa-2x";
            case "reddit" :
                return "fa fa-reddit fa-2x";
            case "twitch" :
                return "fa fa-twitch fa-2x";
            case "vine" :
                return "fa fa-vine fa-2x";
            case "vimeo" :
                return "fa fa-vimeo-square fa-2x";
            case "youtube" :
                return "fa fa-youtube fa-2x";
            default :
                return "fa fa-external-link fa-2x";
        }
    }
});

/**
 *  Calculates the colour given percentage
 */
var calculateColour = function(exp) {
    var red     = 0,
        green   = 0;
    
    red     = exp <= 50 ? 1 : 1 - (((exp - 50) * 2) / 100);
    green   = exp >= 50 ? 1 : ((exp * 2) / 100);

    var rgb = 'rgb(' + (Math.floor(255 * red)) + ',' + (Math.floor(255*green)) + ',0)'
    return rgb;
};


module.exports = Info;
