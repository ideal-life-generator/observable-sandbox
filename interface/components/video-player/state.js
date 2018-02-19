import _state from '__/state' // eslint-disable-line
import _assign from '__/assign' // eslint-disable-line

export default () => {
  const state = {
    loading: false,
    playback: null,
    duration: null,
    currentTime: null,
  }

  const { emit, on } = _state(state)

  const setLoading = loading => {
    state.loading = loading

    if (state.loading) {
      emit('LOADING')
    } else {
      emit('LOADED')
    }
  }

  const setDuration = duration => {
    state.duration = duration

    emit('DURATION_CHANGED')
  }

  const setCurrentTime = currentTime => {
    state.currentTime = currentTime

    emit('CURRENT_TIME_CHANGED')
  }

  return {
    state,
    emit,
    on,
    setLoading,
    setDuration,
    setCurrentTime,
  }
}
