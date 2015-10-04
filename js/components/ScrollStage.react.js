var React           = require('react'),
    LolActions      = require('../actions/LolActions'),
    Stage           = require('../components/Stage.react'); 

/**
 *  Create the stage where performers go
 */
var ScrollStage = React.createClass({
    render: function() {
        var p = this.props;

        if (!this.props.performers) {
            return (<ul></ul>);
        }

        return (
            <ul className='scroll-stage'>
                {this.props.performers.map(function(performer) {
                    return <ScrollItem 
                        isMobile={p.isMobile}
                        performers={p.perfomers}
                        seen={p.seen}
                        autoplay={p.autoplay}
                        current={performer}
                        key={performer._hash}
                    />
                })}
            </ul>
        );
    }
});

var ScrollItem = React.createClass({
    render: function() {
        return  (
            <li className='scroll-item'> 
                <Stage  
                    isMulti={true}
                    isMobile={this.props.isMobile}
                    performers={this.props.perfomers}
                    seen={this.props.seen}
                    autoplay={this.props.autoplay}
                    current={this.props.current}
                />
            </li>
        );
    }
});


/**
 *
                    isMobile={this.state.isMobile}
                    performers={this.state.perfomers}
                    seen={this.state.seen}
                    autoplay={this.state.autoplay}
                    current={this.state.current}
                /> : ''}
 *
 */
module.exports = ScrollStage;
