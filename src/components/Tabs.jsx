import { useDispatch, useSelector } from 'react-redux'
import { setActiveTabs } from '../redux/features/searchSlice'
// import { setActiveTab } from '../redux/slice'

const Tabs = () => {

  const tabs = ['photos', 'videos']
  const dispatch = useDispatch()
  const activeTab = useSelector(state => state.search.activeTabs)

  return (
    <div className='tabs'>
      {tabs.map((item) => (
        <button
          key={item}
          onClick={() => dispatch(setActiveTabs(item))}
          className={`tab-button ${activeTab === item ? 'active' : ''}`}
        >
          {item}
        </button>
      ))}
    </div>
  )
}

export default Tabs
