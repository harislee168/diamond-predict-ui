import { useState, useEffect } from 'react'
import axios from 'axios'
import SpinnerLoading from '../utils/SpinnerLoading'

const Mainbody = () => {
  const [carat, setCarat] = useState(1)
  const [width, setWidth] = useState(8)
  const [clarity, setClarity] = useState('VS1')
  const [color, setColor] = useState('F')
  const [valuation, setValuation] = useState(null)

  const [clarityErrorMessageOn, setClarityErrorMessageOn] = useState(false)
  const [colorErrorMessageOn, setColorErrorMessageOn] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

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
    if (clarity === '') {
      setClarityErrorMessageOn(true)
    }

    if (color === '') {
      setColorErrorMessageOn(true)
    }

    if (clarity !== '' && color !== '') {
      setIsLoading(true);
      const url = `${apiBaseUrl}/getprice`
      const diamondData = {
        carat: carat,
        y: width,
        clarity: clarity,
        color: color
      }

      axios.post(url, JSON.stringify(diamondData), {
        headers: {
          "Content-Type":"application/json"
        }
      }).then((response) => {
        setIsLoading(false)
        setValuation(response.data.price_prediciton)
      }).catch((error) => {
        setIsLoading(false)
        console.log(error)
      })
    }
  }

  const clarityClickedHandler = (e) => {
    setClarity(e.target.value)
    setClarityErrorMessageOn(false)
  }

  const colorClickedHandler = (e) => {
    setColor(e.target.value)
    setColorErrorMessageOn(false)
  }

  const claritySelectedHandler = (value) => {
    setClarity(value)
    setClarityErrorMessageOn(false)
  }

  const colorSelectedHandler = (value) => {
    setColor(value)
    setColorErrorMessageOn(false)
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
      })
      .catch((error) => {
        console.log(error)
      })
  }, [])

  if (isLoading) {
    return (
      <SpinnerLoading />
    )
  }

  return (
    <div>
      <div className='container d-none d-lg-block mt-5'>
        <div className='row'>
          <div className='col mt-1'>
            <div>
              <label htmlFor='carat' className='form-label lead'>Carat (Weight of the diamond): {carat} gram</label>
              <input type='range' className='form-range' min={initialValues.min_carat} max={initialValues.max_carat} step='0.01'
                value={carat} onChange={(e) => setCarat(e.target.value)} id='carat' />
            </div>
            <div className='mt-5'>
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
              <div className="btn-group mt-2" role="group" aria-label="clarity-label" id="clarity" onClick={(e) => clarityClickedHandler(e)}>
                {
                  initialValues.clarities.slice(0,3).map((clarity) => {
                    return (
                      <button type="button" className="btn btn-danger me-2" key={clarity} value={clarity}>{clarity}</button>
                    )
                  })
                }

                {
                  initialValues.clarities.slice(3, 5).map((clarity) => {
                    return (
                      <button type="button" className="btn btn-warning me-2" key={clarity} value={clarity}>{clarity}</button>
                    )
                  })
                }

                {
                  initialValues.clarities.slice(5, 7).map((clarity) => {
                    return (
                      <button type="button" className="btn btn-primary me-2" key={clarity} value={clarity}>{clarity}</button>
                    )
                  })
                }
                {
                  initialValues.clarities.slice(7, 8).map((clarity) => {
                    return (
                      <button type="button" className="btn btn-success me-2" key={clarity} value={clarity}>{clarity}</button>
                    )
                  })
                }
              </div>
            </div>
            <div className='mt-3'>
              <div>
                <label htmlFor="color" className='form-label lead'>Color (Worst to Best): {color}</label>
              </div>
              <div className="btn-group mt-2" role="group" aria-label="color-label" id="color" onClick={(e) => colorClickedHandler(e)}>
                {
                  initialValues.colors.slice(0,2).map((color) => {
                    return (
                      <button type='button' className='btn btn-danger me-2' key={color} value={color}>{color}</button>
                    )
                  })
                }

                {
                  initialValues.colors.slice(2,5).map((color) => {
                    return (
                      <button type='button' className='btn btn-primary me-2' key={color} value={color}>{color}</button>
                    )
                  })
                }

                {
                  initialValues.colors.slice(5,6).map((color) => {
                    return (
                      <button type='button' className='btn btn-success me-2' key={color} value={color}>{color}</button>
                    )
                  })
                }

                {
                  initialValues.colors.slice(6,7).map((color) => {
                    return (
                      <button type='button' className='btn btn-success' key={color} value={color}>{color}</button>
                    )
                  })
                }
              </div>
            </div>
          </div>
        </div>
        <div className='mt-3'>
          {clarityErrorMessageOn && <h5 className='text-danger'>Clarity is not selected</h5>}
          {colorErrorMessageOn && <h5 className='text-danger'>Color is not selected</h5>}
        </div>
        <div className='mt-3'>
          <button type='button' className='btn btn-secondary' onClick={valuationButtonHandler}>Get Valuation</button>
        </div>
        {
          valuation &&

          <div className='m-3'>
            <h2 className='text-success'>Est. valuation is USD {valuation}</h2>
          </div>
        }
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
              <button className="btn btn-primary dropdown-toggle" type="button" id="clarityButton" data-bs-toggle="dropdown"
                aria-expanded="false">
                {clarity === '' ? 'Clarity' : clarity}
              </button>
              <ul className="dropdown-menu" aria-labelledby="clarityButton">
                {
                  initialValues.clarities.slice(0, 3).map((clarity) => {
                    return (
                      <li key={clarity}>
                        <a href="#" className="dropdown-item bg-danger border border-white text-white" onClick={() => {claritySelectedHandler(clarity)}}>{clarity}</a>
                      </li>
                    )
                  })
                }

                {
                  initialValues.clarities.slice(3,5).map((clarity) => {
                    return (
                      <li key={clarity}>
                        <a href="#" className="dropdown-item bg-warning border border-white text-white" onClick={() => {claritySelectedHandler(clarity)}}>{clarity}</a>
                      </li>
                    )
                  })
                }

                {
                  initialValues.clarities.slice(5,7).map((clarity) => {
                    return (
                      <li key={clarity}>
                        <a href="#" className="dropdown-item bg-primary border border-white text-white" onClick={() => {claritySelectedHandler(clarity)}}>{clarity}</a>
                      </li>
                    )
                  })
                }

                {
                  initialValues.clarities.slice(7,8).map((clarity) => {
                    return (
                      <li key={clarity}>
                        <a href="#" className="dropdown-item bg-success border border-white text-white" onClick={() => {claritySelectedHandler(clarity)}}>{clarity}</a>
                      </li>
                    )
                  })
                }

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
                {
                  initialValues.colors.slice(0,2).map((color) => {
                    return (
                      <li key={color}>
                        <a href="#" className="dropdown-item bg-danger border border-white text-white" onClick={() => colorSelectedHandler(color)}>{color}</a>
                      </li>
                    )
                  })
                }

                {
                  initialValues.colors.slice(2,5).map((color) => {
                    return (
                      <li key={color}>
                        <a href="#" className="dropdown-item bg-primary border border-white text-white" onClick={() => colorSelectedHandler(color)}>{color}</a>
                      </li>
                    )
                  })
                }

                {
                  initialValues.colors.slice(5,7).map((color) => {
                    return (
                      <li key={color}>
                        <a href="#" className="dropdown-item bg-success border border-white text-white" onClick={() => colorSelectedHandler(color)}>{color}</a>
                      </li>
                    )
                  })
                }
              </ul>
            </div>
          </div>
        </div>
        <div className='m-3'>
          {clarityErrorMessageOn && <h5 className='text-danger'>Clarity is not selected</h5>}
          {colorErrorMessageOn && <h5 className='text-danger'>Color is not selected</h5>}
        </div>
        <div className='m-3'>
          <button type='button' className='btn btn-secondary' onClick={valuationButtonHandler}>Get Valuation</button>
        </div>
        {
          valuation &&

          <div className='m-3'>
            <h2 className='text-success'>Est. valuation is USD {valuation}</h2>
          </div>
        }
      </div>
    </div>
  )
}

export default Mainbody
