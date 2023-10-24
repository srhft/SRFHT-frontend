import { useDispatch } from 'react-redux';
import { startLoading } from '../redux/LoadingSlice';

function Test() {
  const dispatch = useDispatch();

  const makeCall = async () => {
    dispatch(startLoading())
  }
  const withmakeCall = async () => {
    dispatch(startLoading({title: "Title Loading", desc: "My desc", cta: "Submit"}))
  }

  return (
    <div>
      <button onClick={makeCall}>default</button>
      <button onClick={withmakeCall}>custom</button>
    </div>
  )
}

export default Test
