import React, { Component } from 'react'

class Form extends Component {
  state = {
    formData: {}
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.submit(this.state.formData)
  }

  handleChange = (e) => {
    const { formData } = this.state;
    formData[e.target.id] = e.target.value;

    this.setState({
      formData
    })
  }

  render() {
    const { title, fields, formError } = this.props;

    return (
      <form className="m-0 w-100 bg-white py-4 px-5 rounded-lg shadow" onSubmit={this.handleSubmit} noValidate>
        <h2 className="text-center">{ title }</h2>
        { fields && fields.map(field => (
          <div className="form-group" key={field.id}>
            <label htmlFor={field.id}>{field.label}</label>
            <input type={field.type} className="form-control" id={field.id} onChange={this.handleChange} />
          </div>
        ))}
        <div className="text-center">
          <div className="text-danger">
              { formError ? <p className="mt-4 mb-1">{ formError }</p> : null }
            </div>
          <button type="submit" className="btn btn-primary mt-3">{ title }</button>
        </div>
      </form>
    )
  }
}

export default Form