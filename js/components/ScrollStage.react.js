var React               = require('react'),
    LolActions          = require('../actions/LolActions'),
    Stage               = require('./Stage.react');

/**
 *  Create the stage where performers go
 */
var ScrollStage = React.createClass({
    shouldComponentUpdate: function(nextProps, nextState) {
        return this.props.performers.length > 0;
    },

    getInitialState: function() {
        //keep a hash of the items currently in dusplay
        return {
            'displayed' : {},
            'performers' : []
        };
    },

    render: function() {
        var p = this.props;

        this.state.performers = this.props.performers.map(function(item) {
            return (
                <li 
                    key={item._hash}
                    className='scroll-item'> 
                    <Stage  
                        isMulti={true}
                        isMobile={p.isMobile}
                        performers={p.perfomers}
                        seen={p.seen}
                        autoplay={p.autoplay}
                        current={item}
                    />
                </li>
            );
        });

        // for (var i = 0; i < this.props.performers.length; i++) {
            // var item = this.props.performers[i];

            // if (this.state.displayed[item._hash]) {
                // continue;
            // }

            // this.state.performers.push(
                // <li 
                    // key={item._hash}
                    // className='scroll-item'> 
                    // <Stage  
                        // isMulti={true}
                        // isMobile={this.props.isMobile}
                        // performers={this.props.perfomers}
                        // seen={this.props.seen}
                        // autoplay={this.props.autoplay}
                        // current={item}
                    // />
                // </li>
            // );
            
            // this.state.displayed[item._hash] = true;
        // }
        console.log('sdsdsdsdsdsasasas', this.state.performers);
        
        return (
            <ul className='scroll-stage'>
                {this.state.performers}
            </ul>
        );
    }
});

module.exports = ScrollStage;
