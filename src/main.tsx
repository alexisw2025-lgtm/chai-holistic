import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
// @ts-expect-error jsx module without types
import ChaiHolistic from './chaiholistic_slim_fixed'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ChaiHolistic />
  </StrictMode>,
)
