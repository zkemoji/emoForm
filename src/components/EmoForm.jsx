import React from 'react'

function EmoForm() {
  return (
    <div>
              <div>
        {(!isFormVisible) ? (
          <form onSubmit={handleSubmit}>
            <label>
              Secret Phrase:
              <input
                type="text"
                value={secretPhrase}
                onChange={handleSecretPhraseChange}
              />
            </label>
            <button type="submit">Submit</button>
          </form>
        ) : (
          <div>
            <h2>Submission Form</h2>
            <form onSubmit={handleFormSubmit}>
              <label>
                Username:
                <input
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleInputChange}
                />
              </label>
              <label>
                Link:
                <input
                  type="text"
                  name="link"
                  value={formData.link}
                  onChange={handleInputChange}
                />
              </label>
              <label>
                Address:
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                />
              </label>
              {/* Add more form fields here */}
              <button type="submit">
                {loading ? 'Loading' : 'Submit'}
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  )
}

export default EmoForm