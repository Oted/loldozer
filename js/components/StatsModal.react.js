var React       = require('react'),
    LineChart   = require("react-chartjs").Line,
    LolActions  = require('../actions/LolActions'),
    options = {
        animationEasing: 'easeOutSine',
        responsive : true
   };

/**
 * Modal for showing the add item
 */
var StatsModal = React.createClass({
    render: function() {
        var style = {
            display : this.props.modal ? 'block' : 'none',
        };

        // console.log('YAAAAAY :D',this.props.data);

        if (!this.props.modal) {
            return (
                <div
                    onClick={this._closeModal}
                    style={style}
                    className={'overlay'}>
                </div>
            );
        }

        if (!this.props.data || this.props.data.labels.length < 1) {
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
                        <p>
                            No data provided yet :(
                        </p>
                    </div>
                </div>
            );
        }

        this._calculateSteps();

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
                        data={this._wrapData()}
                        options={options} 
                    />
                </div>
            </div>
        );
    },

    /**
     * Close modal
     */
    _closeModal: function() {
        console.log('close stats');
        LolActions.closeModal('stats');
    },

    /**
     *  Prevent overlay from being clicked when modal is clicked
     */
    _modalClick : function(e) {
        e.stopPropagation();
    },

    /**
     *  Converts data given from statshandler to the format needed
     */
    _wrapData : function() {
        var chartPoints = this.props.data.charts;

        var data = {
            'labels' : this.props.data.labels,
            'datasets' : []
        };
        
        for (var i = 0; i < chartPoints.length; i++) {
            data.datasets.push({
                label: "data",
                fillColor: "rgba(220,220,220,0.2)",
                strokeColor: "rgba(220,220,220,1)",
                pointColor: "rgba(220,220,220,1)",
                pointStrokeColor: "#fff",
                pointHighlightFill: "#fff",
                pointHighlightStroke: "rgba(220,220,220,1)",
                data: chartPoints[i] 
            });
        }

        return data;
    },

    /**
     *  Calculates the right stepps and max/min
     */
    _calculateSteps : function() {
        var maxValue = Math.max.apply(Math, this.props.data.charts[0]),
            minValue = Math.min.apply(Math, this.props.data.charts[0]),
            step     = Math.abs(minValue) + Math.abs(maxValue);

        // options.tooltipTemplate = function(valuesObject) {
            // console.log(valuesObject);
            // do different things here based on whatever you want;
            // return "Just some text w";
        // }

        options.scaleOverride = true;
        options.scaleSteps = step;
        options.scaleStepWidth = 1;
        options.scaleStartValue = minValue - 1;
    }
});
module.exports = StatsModal;
