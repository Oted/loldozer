var React       = require('react');

/**
 * The navigation
 */
var Video = React.createClass({
    componentDidMount: function() {
        var isVideo = this.props.current.type === 'video',
            video, 
            wrapper;
        
        wrapper = document.createElement('div');
        if (isVideo) {
            wrapper.innerHTML = "<video id='attachmentVideo' class='video-js vjs-default-skin' controls preload='auto' width='100%' height='100%><source src='" + 
            this.props.current.data.replace('.gifv','.mp4') + 
            "' type='video/mp4' /><p className='vjs-no-js'>To view this video please enable JavaScript, and consider upgrading to a web browser that <a href='http://videojs.com/html5-video-support/' target='_blank'>supports HTML5 video</a></p></video>";
        }

        video = wrapper.firstChild;
        this.refs.target.getDOMNode().appendChild(video);
        return videojs(video, {});
    },
    render: function() {
        var isVideo = this.props.current.type === 'gifv';
           
        return (
            <div 
                id="attachmentViewer"
                className={isVideo ? 'container' : 'hidden'}>
                <div id="attachmentVideoContainer" ref="target"/>
            </div>
            );
    }
});

module.exports = Video;
