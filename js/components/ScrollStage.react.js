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
        this.scrollCounter = 0;

        return {
            'elements': [],
            'itemInFocus' : null,
            'isInfiniteLoading': true,
            'itemHeight' : 500,
            'navHeight' : 136
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
                        <h1>
                            { performer.title ? performer.title.length <= 80 ? performer.title : performer.title.slice(0,77) + '...' : '(untitled)' }
                        </h1>
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
        //for optiminze, only check every 30 times
        this.scrollCounter++;

        if (this.scrollCounter % 30 !== 0) {
            return;
        }
      
        this.scrollCounter = 0;

        var position        = window.pageYOffset || document.documentElement.scrollTop,
            scrollHeight    = position - this.state.navHeight + window.innerHeight / 3,
            focusIndex      = Math.round(scrollHeight / this.state.itemHeight);

        var hash = this.state.elements[focusIndex].key.split('-').pop();

        if (this.state.itemInFocus === hash || position < 1) {
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
                            elementHeight={this.state.itemHeight}
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
