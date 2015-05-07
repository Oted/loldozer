var React       = require('react'),
    LineChart   = require("react-chartjs").Line,
    LolActions  = require('../actions/LolActions')
    options = {
        animationEasing: 'easeOutSine',
        responsive : true
    };
 
/**
 * Modal for showing the add item
 */
var StatsModal = React.createClass({
    shouldComponentUpdate: function(nextProps, nextState) {
        return this.props.modal !== nextProps.modal;
    },
    getInitialState: function() {
        return {
            data : {
                labels : ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
                datasets : [{
                    label: "My First dataset",
                    fillColor: "rgba(220,220,220,0.2)",
                    strokeColor: "rgba(220,220,220,1)",
                    pointColor: "rgba(220,220,220,1)",
                    pointStrokeColor: "#fff",
                    pointHighlightFill: "#fff",
                    pointHighlightStroke: "rgba(220,220,220,1)",
                    data: [65, 59, 80, 81, 56, 55, 40]
                }]
            }
        }
    },

    render: function() {
        var style = {
            display : this.props.modal ? 'block' : 'none',
        };

        if (!this.props.modal) {
            return (
                <div
                    onClick={this._closeModal}
                    style={style}
                    className={'overlay'}>
                </div>
            );
        }

        console.log(this.state.data);

        return (
            <div
                onClick={this._closeModal}
                style={style}
                className={'overlay'}>
                <div
                    onClick={this._modalClick}
                    className={'modal active'}
                    style={style}
                    id={'stats-modal'}>
                    <LineChart 
                        data={this.state.data}
                        options={options} 
                    />
                </div>
            </div>
        );
    },

    /**
     *  Adds data
     */
    _addData : function() {
    
    },

    /**
     * Close modal
     */
    _closeModal: function() {
        console.log('close stats')
        LolActions.closeModal('stats');
    }
});

module.exports = StatsModal;
