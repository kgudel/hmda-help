import React, { Component } from 'react'

import { flattenApiForState } from '../utils/convert'

import Form from './Form'
import Results from './Results'
import Alert from './Alert'

import './Form.css'

class Search extends Component {
  constructor(props) {
    super(props)

    this.state = {
      institutions: null,
      error: null,
      lei: '',
      taxId: '',
      respondentName: '',
      emailDomains: ''
    }

    this.deleteAnInstitution = this.deleteAnInstitution.bind(this)
    this.updateInstitutions = this.updateInstitutions.bind(this)
    this.updateError = this.updateError.bind(this)
  }

  deleteAnInstitution(key) {
    let newInstitutions = this.state.institutions.filter(
      (institution, i) => i !== key
    )
    if (newInstitutions.length === 0) newInstitutions = null
    this.setState({ institutions: newInstitutions })
  }

  updateInstitutions(response) {
    this.setState({ institutions: [flattenApiForState(response)], error: null })
  }

  updateError(error, formData) {
    if (formData) {
      this.setState({
        error: error,
        lei: formData.lei,
        taxId: formData.taxId,
        respondentName: formData.respondentName,
        emailDomains: formData.emailDomains,
        institutions: null
      })
    } else {
      this.setState({
        error: error,
        lei: '',
        taxId: '',
        respondentName: '',
        emailDomains: '',
        institutions: null
      })
    }
  }

  render() {
    return (
      <React.Fragment>
        <h3>Search for institution records</h3>
        <Form
          updateInstitutions={this.updateInstitutions}
          updateError={this.updateError}
        />

        <Results
          institutions={this.state.institutions}
          deleteAnInstitution={this.deleteAnInstitution}
          token={this.props.token}
        />

        {this.state.error ? (
          <Alert
            lei={this.state.lei}
            taxId={this.state.taxId}
            respondentName={this.state.respondentName}
            emailDomains={this.state.emailDomains}
            heading="Oh no!"
            message={this.state.error.message}
          />
        ) : null}
      </React.Fragment>
    )
  }
}

export default Search
