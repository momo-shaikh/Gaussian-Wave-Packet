import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import * as Slider from '@radix-ui/react-slider';
import './App.css';

function App() {
  const [sigma, setSigma] = useState(1);
  const [k, setK] = useState(5);
  const [t, setT] = useState(0);

  const generateData = () => {
    const data = [];
    for (let x = -5; x <= 5; x += 0.1) {
      const realPart = Math.exp(-(x * x) / (4 * sigma * sigma)) * Math.cos(k * x - t);
      const imagPart = Math.exp(-(x * x) / (4 * sigma * sigma)) * Math.sin(k * x - t);
      const probability = realPart * realPart + imagPart * imagPart;
      data.push({ 
        x: Number(x.toFixed(1)), 
        real: Number(realPart.toFixed(4)),
        imag: Number(imagPart.toFixed(4)),
        prob: Number(probability.toFixed(4))
      });
    }
    return data;
  };

  const data = generateData();

  return (
    <div className="App">
      <h1>Interactive Gaussian Wave Function</h1>
      <div style={{ width: '100%', height: 300 }}>
        <ResponsiveContainer>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="x" label={{ value: 'Position (x)', position: 'insideBottom', offset: -5 }} />
            <YAxis label={{ value: 'Amplitude', angle: -90, position: 'insideLeft' }} />
            <Tooltip formatter={(value) => value.toFixed(4)} />
            <Line type="monotone" dataKey="real" stroke="#8884d8" dot={false} name="Real Part" />
            <Line type="monotone" dataKey="imag" stroke="#82ca9d" dot={false} name="Imaginary Part" />
            <Line type="monotone" dataKey="prob" stroke="#ff7300" dot={false} name="Probability Density" />
          </LineChart>
        </ResponsiveContainer>
      </div>
      <div className="controls">
        <div className="slider-container">
          <label>Sigma (width): {sigma.toFixed(2)}</label>
          <Slider.Root
            value={[sigma]}
            onValueChange={(value) => setSigma(value[0])}
            min={0.1}
            max={2}
            step={0.1}
            className="slider"
          >
            <Slider.Track className="slider-track">
              <Slider.Range className="slider-range" />
            </Slider.Track>
            <Slider.Thumb className="slider-thumb" />
          </Slider.Root>
        </div>
        <div className="slider-container">
          <label>k (wavenumber): {k.toFixed(2)}</label>
          <Slider.Root
            value={[k]}
            onValueChange={(value) => setK(value[0])}
            min={0}
            max={10}
            step={0.1}
            className="slider"
          >
            <Slider.Track className="slider-track">
              <Slider.Range className="slider-range" />
            </Slider.Track>
            <Slider.Thumb className="slider-thumb" />
          </Slider.Root>
        </div>
        <div className="slider-container">
          <label>t (time): {t.toFixed(2)}</label>
          <Slider.Root
            value={[t]}
            onValueChange={(value) => setT(value[0])}
            min={0}
            max={10}
            step={0.1}
            className="slider"
          >
            <Slider.Track className="slider-track">
              <Slider.Range className="slider-range" />
            </Slider.Track>
            <Slider.Thumb className="slider-thumb" />
          </Slider.Root>
        </div>
      </div>
    </div>
  );
}

export default App;