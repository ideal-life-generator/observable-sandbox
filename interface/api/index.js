import moment from 'moment'
import axios from './utils/axios'
import googleOAuth from './google-oauth'
import { YOUTUBE_API_KEY } from '../../config'

const normalizeIds = ({ items }) =>
  items.map(({ id: { videoId: id } }) => id).join(',')

const normalize = ({
  pageInfo: { totalResults },
  items,
  items: { length: count }
}) => ({
  count,
  items: items.map(({
    id,
    snippet: { title, thumbnails: { medium: { url: thumbnail } } },
    contentDetails: { duration: pureDuration }
  }) => ({
    id,
    title,
    thumbnail,
    source: `http://localhost:3001/youtube/mp3/${id}`,
    duration: moment.duration(pureDuration).asSeconds()
  })),
  total: totalResults
})

const search = async (params = {}) => {
  const { key, count } = params

  const { data: ids } = await axios('search', {
    params: {
      q: key,
      maxResults: count,
      type: 'video',
      part: 'id',
      key: YOUTUBE_API_KEY
    }
  })

  const normalizedIds = normalizeIds(ids)

  const { data } = await axios('videos', {
    params: {
      id: normalizedIds,
      part: 'snippet,contentDetails',
      key: YOUTUBE_API_KEY
    }
  })

  const normalizedData = normalize(data)

  return normalizedData
}

export default { search, googleOAuth }
