import { useState, useEffect } from 'react'
import axios from 'axios'

const Mainbody = () => {
  const [carat, setCarat] = useState(1)
  const [width, setWidth] = useState(8)
  const [clarity, setClarity] = useState('')
  const [color, setColor] = useState('')

  const [initialValues, setInitialValues] = useState({
    min_carat: 1,
    max_carat: 1,
    min_y: 5,
    max_y: 5,
    clarities: [],
    colors: []
  })

  const apiBaseUrl = process.env.REACT_APP_API_BASE_URL

  const valuationButtonHandler = () => {
    console.log('Carat:' + carat + ' width: ' + width + ' clarity: ' + clarity + ' color: ' + color)
  }

  useEffect(() => {
    const url = `${apiBaseUrl}/getinitialvalues`
    console.log('url:' + url)
    axios.get(url)
      .then((response) => {
        setInitialValues({
          min_carat: response.data.min_carat,
          max_carat: response.data.max_carat,
          min_y: response.data.min_y,
          max_y: response.data.max_y,
          clarities: response.data.clarities,
          colors: response.data.colors
        })
        console.log('Initial: ')
        console.log(initialValues.min_y)
      })
      .catch((error) => {
        console.log(error)
      })
  }, [])

  return (
    <div>
      <div className='container d-none d-lg-block mt-5'>
        <div className='row'>
          <div className='col'>
            <div>
              <label htmlFor='carat' className='form-label lead'>Carat (Weight of the diamond): {carat} gram</label>
              <input type='range' className='form-range' min={initialValues.min_carat} max={initialValues.max_carat} step='0.01'
                value={carat} onChange={(e) => setCarat(e.target.value)} id='carat' />
            </div>
            <div className='mt-3'>
              <label htmlFor='width' className='form-label lead'>Width of the diamond: {width} mm</label>
              <input type='range' className='form-range' min={initialValues.min_y} max={initialValues.max_y} step='0.01'
                value={width} onChange={(e) => setWidth(e.target.value)} id='width' />
            </div>
          </div>
          <div className='col'>
            <div>
              <div>
                <label htmlFor="clarity" className='form-label lead'>Clarity (Worst to Best): {clarity}</label>
              </div>
              <div className="btn-group mt-2" role="group" aria-label="clarity-label" id="clarity" onClick={(e) => setClarity(e.target.value)}>
                <button type="button" className="btn btn-danger me-2" value="I1">I1</button>
                <button type="button" className="btn btn-danger me-2" value="SI2">SI2</button>
                <button type="button" className="btn btn-danger me-2" value="SI1">SI1</button>

                <button type="button" className="btn btn-warning me-2" value="VS2">VS2</button>
                <button type="button" className="btn btn-warning me-2" value="VS1">VS1</button>

                <button type="button" className="btn btn-primary me-2" value="VVS2">VVS2</button>
                <button type="button" className="btn btn-primary me-2" value="VVS1">VVS1</button>
                <button type="button" className="btn btn-success" value="IF">IF</button>
              </div>
            </div>
            <div className='mt-3'>
              <div>
                <label htmlFor="color" className='form-label lead'>Color (Worst to Best): {color}</label>
              </div>
              <div className="btn-group mt-2" role="group" aria-label="color-label" id="color" onClick={(e) => setColor(e.target.value)}>
                <button type='button' className='btn btn-danger me-2' value='J'>J</button>
                <button type='button' className='btn btn-danger me-2' value='I'>I</button>

                <button type='button' className='btn btn-primary me-2' value='H'>H</button>
                <button type='button' className='btn btn-primary me-2' value='G'>G</button>
                <button type='button' className='btn btn-primary me-2' value='F'>F</button>

                <button type='button' className='btn btn-success me-2' value='E'>E</button>
                <button type='button' className='btn btn-success' value='D'>D</button>
              </div>
            </div>
          </div>
        </div>
        <div className='mt-3'>
          <button type='button' className='btn btn-secondary' onClick={valuationButtonHandler}>Get Valuation</button>
        </div>
        <div className='mt-5'>
          <h2>Est. valuation is: 1800</h2>
        </div>
      </div>

      <div className='container d-lg-none mt-4'>
        <div className='ms-3'>
          <div>
            <label htmlFor='carat' className='form-label lead'>Carat (Weight of the diamond): {carat} gram</label>
            <input type='range' className='form-range' min={initialValues.min_carat} max={initialValues.max_carat} step='0.01'
              value={carat} onChange={(e) => setCarat(e.target.value)} id='carat' />
          </div>
          <div className='mt-3'>
            <label htmlFor='width' className='form-label lead'>Width of the diamond: {width} mm</label>
            <input type='range' className='form-range' min={initialValues.min_y} max={initialValues.max_y} step='0.01'
              value={width} onChange={(e) => setWidth(e.target.value)} id='width' />
          </div>
          <div className='mt-3'>
            <div>
              <label htmlFor="clarity" className='form-label lead'>Clarity (Worst to Best): {clarity}</label>
            </div>
            <div className="dropdown">
              <button className="btn btn-primary dropdown-toggle" type="button" id="clairtyButton" data-bs-toggle="dropdown"
                aria-expanded="false">
                {clarity === '' ? 'Clarity' : clarity}
              </button>
              <ul className="dropdown-menu" aria-labelledby="clairtyButton">
                <li><a className="dropdown-item bg-danger border border-white" href="#" onClick={() => setClarity('I1')}>I1</a></li>
                <li><a className="dropdown-item bg-danger border border-white" href="#" onClick={() => setClarity('SI2')}>SI2</a></li>
                <li><a className="dropdown-item bg-danger border border-white" href="#" onClick={() => setClarity('SI1')}>SI1</a></li>

                <li><a className="dropdown-item bg-warning border border-white" href="#" onClick={() => setClarity('VS2')}>VS2</a></li>
                <li><a className="dropdown-item bg-warning border border-white" href="#" onClick={() => setClarity('VS1')}>VS1</a></li>

                <li><a className="dropdown-item bg-primary border border-white" href="#" onClick={() => setClarity('VVS2')}>VVS2</a></li>
                <li><a className="dropdown-item bg-primary border border-white" href="#" onClick={() => setClarity('VVS1')}>VVS1</a></li>
                <li><a className="dropdown-item bg-success border border-white" href="#" onClick={() => setClarity('IF')}>IF</a></li>
              </ul>
            </div>
          </div>

          <div className='mt-3'>
            <div>
              <label htmlFor="color" className='form-label lead'>Color (Worst to Best): {color}</label>
            </div>
            <div className="dropdown">
              <button className="btn btn-primary dropdown-toggle" type="button" id="colorButton" data-bs-toggle="dropdown"
                aria-expanded="false">
                {color === '' ? 'Color' : color}
              </button>
              <ul className="dropdown-menu" aria-labelledby="colorButton">
                <li><a className="dropdown-item bg-danger border border-white" href="#" onClick={() => setColor('J')}>J</a></li>
                <li><a className="dropdown-item bg-danger border border-white" href="#" onClick={() => setColor('I')}>I</a></li>

                <li><a className="dropdown-item bg-primary border border-white" href="#" onClick={() => setColor('H')}>H</a></li>
                <li><a className="dropdown-item bg-primary border border-white" href="#" onClick={() => setColor('G')}>G</a></li>
                <li><a className="dropdown-item bg-primary border border-white" href="#" onClick={() => setColor('F')}>F</a></li>

                <li><a className="dropdown-item bg-success border border-white" href="#" onClick={() => setColor('E')}>E</a></li>
                <li><a className="dropdown-item bg-success border border-white" href="#" onClick={() => setColor('D')}>D</a></li>
              </ul>
            </div>
          </div>
        </div>
        <div className='m-3'>
          <button type='button' className='btn btn-secondary' onClick={valuationButtonHandler}>Get Valuation</button>
        </div>
        <div className='m-3'>
          <h2>Est. valuation is: 1800</h2>
        </div>
      </div>
    </div>
  )
}

export default Mainbody
