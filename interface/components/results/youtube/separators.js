import _separators from '_/separators' // eslint-disable-line
import _animateStyle from '_/animate-style' // eslint-disable-line
import { itemHeight, animationDuration } from '../settings'
import { separator as cloneSeparator } from '../cloners'
import { $separators } from './elements'

export default _separators($separators, {
  create: i => cloneSeparator({
    coords: { top: i * itemHeight },
    animateStyle: [{ duration: animationDuration }, { opacity: 0 }, { opacity: 1 }],
  }),
  remove: async $separator => await _animateStyle($separator, { duration: animationDuration }, { opacity: 1 }, { opacity: 0 }),
})
