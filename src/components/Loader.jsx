import React from 'react'
import LoadingOverlay from 'react-loading-overlay'

const Loader = ({ isActive }) => {
  return (
    <LoadingOverlay
        active={isActive}
        spinner
        text=""
        styles={{
          overlay: (base) => ({
            ...base,
            background: "rgba(16, 16, 16, 0.5)",
            position: 'fixed',
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
          }),
        }}
      />
  )
}

export default Loader
