var React       = require('react'),
    LineChart   = require("react-chartjs").Line,
    LolActions  = require('../actions/LolActions')
    options = {
        animationEasing: 'easeOutSine',
        responsive : true
    };

//9c7f8f1b2c992c9b5e9a904828aafa81

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
    }
});
module.exports = StatsModal;
