var React               = require('react'),
    LolActions          = require('../actions/LolActions'),
    Stage               = require('./Stage.react'),
    ScrollItemControls  = require('./ScrollItemControls.react'),
    Infinite            = require('react-infinite');

/**
 *  Create the stage where performers go
 */
var ScrollStage = React.createClass({
    getInitialState: function() {
        return {
            'elements': [],
            'itemInFocus' : null,
            'isInfiniteLoading': false
        }
    },
    
    componentWillReceiveProps: function(nextProps) {
        if (!nextProps.performers.length) {
            return ;
        }

        if (this.state.elements.length !== nextProps.performers.length) {
            this.setState({
                isInfiniteLoading: false
            });
        }

        this.setState({
            elements: this.buildElements(nextProps, 0, nextProps.performers.length)
        });

        if (!nextProps.itemInFocus) {
            nextProps.itemInFocus = nextProps.performers[0];
        }

        if (!this.state.itemInfocus || this.state.itemInFocus._hash !== nextProps.itemInFocus._hash) {
            this.setState({
                "itemInFocus" : nextProps.itemInFocus
            })
        }
    },
    
    buildElements: function(props, start, end) {
        var elements = [];

        for (var i = start; i < end; i++) {
            var performer = props.performers[i];
            
            elements.push(
                <div
                    id={'scroll-' + performer._hash}
                    key={'scroll-' + performer._hash}
                    className={(props.itemInFocus || {})._hash === performer._hash ? 'focus scroll-item' : 'un-focus scroll-item'}>
                    <div className='info'>
                        <h1> {performer.title || '(untitled)'} </h1>
                        <h1 className='shared-title blue'> {performer.shared === true ? '(this item was shared with you)' : ''} </h1>
                    </div>
                    <Stage
                        style={{'maxHeight': '390px'}}
                        isMulti={true}
                        isMobile={props.isMobile}
                        performers={props.perfomers}
                        seen={props.seen}
                        autoplay={props.autoplay}
                        current={performer}
                        isFocus={(props.itemInFocus || {})._hash === performer._hash}
                    />
                    <ScrollItemControls current={performer}></ScrollItemControls>
                </div>
            );
        }

        return elements;
    },

    _handleItemInFocus : function(node) {
        var targets = node.querySelectorAll('div > div > div[id]'),
            target  = this.props.isMobile ? targets[Math.round(targets.length / 2)] : targets[Math.floor(targets.length / 2)],
            id      = target.getAttribute('id'),
            hash;
       
        if (!target || !id) {
            return;
        }
        
        hash = id.split('-').pop();
       
        if (this.state.itemInFocus === hash) {
            return;
        }

        LolActions.itemInFocus(hash);
    },

    handleInfiniteLoad: function() {
        if (this.state.isInfiniteLoading) {
            console.log('alrdy loading...');
            return;
        }

        this.setState({
            isInfiniteLoading: true
        });

        LolActions.bottomScroll();
    },

    render : function() {
        var that = this;

        if (!this.props.performers.length) {
            return (<div></div>);
        }

        return (<div id='scroll-container'> 
                    <Infinite
                            handleScroll={this._handleItemInFocus}
                            useWindowAsScrollContainer 
                            elementHeight={498}
                            infiniteLoadBeginEdgeOffset={2000}
                            onInfiniteLoad={this.handleInfiniteLoad}
                            isInfiniteLoading={this.state.isInfiniteLoading}>
                                {this.state.elements}
                    </Infinite>
                </div>
            );
    },

    elementInfiniteLoad: function() {
        return 
            <div className="infinite-list-item">
                Loading...
            </div>
    },
});

module.exports = ScrollStage;
