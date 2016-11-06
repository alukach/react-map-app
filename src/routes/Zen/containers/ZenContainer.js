/* @flow */
import { connect } from 'react-redux'
import { requestZen, saveCurrentZen } from '../modules/zen.actions'
import Zen from '../components/Zen'
import type { ZenObject } from '../interfaces/zen'

const mapActionCreators: {requestZen: Function, saveCurrentZen: Function} = {
  requestZen,
  saveCurrentZen
}

const mapStateToProps = (state): { zen: ?ZenObject, saved: Array<ZenObject> } => ({
  zen: state.zen.zens.find(zen => zen.id === state.zen.current),
  saved: state.zen.zens.filter(zen => state.zen.saved.indexOf(zen.id) !== -1)
})

export default connect(mapStateToProps, mapActionCreators)(Zen)