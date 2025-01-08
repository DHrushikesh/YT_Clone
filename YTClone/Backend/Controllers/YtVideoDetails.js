import YtVideoData from "../Model/YtVideoData.js";


export async function getYtDetails(req, res) {
  try {
    const YtDataDetails = await YtVideoData.find();
    if (!YtDataDetails || YtDataDetails.length === 0) {
      return res.status(404).json({ message: 'No Videos Found' });
    }
    res.json(YtDataDetails);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}


export async function postYtDetails(req, res) {
  const {
    title,
    thumbnailUrl,
    YTURl,
    description,
    views,
    likes,
    dislikes,
    genre,
    uploadDate,
    channelName,
    uploader
  } = req.body;

  if (!title || !thumbnailUrl || !YTURl || !description || !genre || !uploadDate || !channelName || !uploader) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  const newVideo = new YtVideoData({
    title,
    thumbnailUrl,
    YTURl,
    description,
    views,
    likes,
    dislikes,
    genre,
    uploadDate,
    channelName,
    uploader
  });

  try {
    const savedVideo = await newVideo.save();
    res.status(201).json(savedVideo);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

export async function addComment(req, res) {
  const { user, text , videoId } = req.body;

  if (!user || !text) {
    return res.status(400).json({ message: 'User and text are required' });
  }

  try {
    const video = await YtVideoData.findById(videoId);
    if (!video) {
      return res.status(404).json({ message: 'Video not found' });
    }

    video.comments.push({ user, text });
    await video.save();

    res.status(201).json({ message: 'Comment added successfully', comments: video.comments });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

// Update video details
export async function updateYtDetails(req, res) {
  const { id } = req.params;
  const {
    title,
    thumbnailUrl,
    YTURl,
    description,
    views,
    likes,
    dislikes,
    genre,
    uploadDate,
    channelName,
    uploader
  } = req.body;

  try {
    const updatedVideo = await YtVideoData.findByIdAndUpdate(id, {
      title,
      thumbnailUrl,
      YTURl,
      description,
      views,
      likes,
      dislikes,
      genre,
      uploadDate,
      channelName,
      uploader
    }, { new: true });

    if (!updatedVideo) {
      return res.status(404).json({ message: 'Video not found' });
    }

    res.json(updatedVideo);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}


// Get videos by channel name
export async function getVideosByChannelName(req, res) {
  const { channelName } = req.body;

  if (!channelName) {
    return res.status(400).json({ message: 'Channel name is required' });
  }

  try {
    const videos = await YtVideoData.find({ channelName });
    if (!videos || videos.length === 0) {
      return res.status(404).json({ message: 'No videos found for this channel' });
    }
    res.json(videos);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

export async function getYtDetailsbyID(req, res) {
  const { id } = req.params;

  try {
    const video = await YtVideoData.findById(id);
    if (!video) {
      return res.status(404).json({ message: 'Video not found' });
    }
    res.json(video);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

export async function deleteYtDetails(req, res) {
  const { id } = req.params;

  try {
    const deletedVideo = await YtVideoData.findByIdAndDelete(id);
    if (!deletedVideo) {
      return res.status(404).json({ message: 'Video not found' });
    }
    res.json({ message: 'Video deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}