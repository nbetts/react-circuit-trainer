import React, { Component, Fragment } from 'react'
import { last, uniqueId } from 'lodash'
import moment from 'moment'
import Timer from '../timer/Timer'

const testSets = [{"id":"set-1","title":"Warm-up","repetitions":2,"restTime":120,"exercises":[{"id":"set-exercise-2","title":"Jumping jacks","duration":30,"restTime":10},{"id":"set-exercise-3","title":"Pull ups","duration":30,"restTime":10}]},{"id":"set-4","title":"Main set","repetitions":3,"restTime":120,"exercises":[{"id":"set-exercise-5","title":"Squats","duration":45,"restTime":15},{"id":"set-exercise-6","title":"Sit ups","duration":30,"restTime":10},{"id":"set-exercise-7","title":"Hanging leg raises","duration":30,"restTime":10}]}]

class WorkoutTimer extends Component {
  state = {
    workoutTitle: 'My workout',
    sets: testSets
  }

  handleSubmit = (e) => {
    e.preventDefault();
  }

  setWorkoutTitle = (e) => {
    const workoutTitle = e.target.value;
    this.setState({ workoutTitle: workoutTitle ? workoutTitle : 'My workout' })
  }

  addSet = () => {
    const { sets } = this.state;
    sets.push({
      id: uniqueId('set-'),
      title: null,
      repetitions: 1,
      restTime: 0,
      exercises: []
    })

    this.setState({ sets })
  }

  removeSet = (setId) => {
    this.setState({
      sets: this.state.sets.filter(set => set.id !== setId)
    })
  }

  updateSetTitle = (setId, title) => {
    const { sets } = this.state;
    
    for (let i = 0; i < sets.length; i++) {
      if (sets[i].id === setId) {
        sets[i].title = title;
        this.setState({ sets })
        return;
      }
    }
  }

  updateSetRepetitions = (setId, repetitions) => {
    const { sets } = this.state;
    const repetitionsInt = parseInt(repetitions);
    
    for (let i = 0; i < sets.length; i++) {
      if (sets[i].id === setId) {
        sets[i].repetitions = repetitionsInt >= 1 ? repetitionsInt : 1;
        this.setState({ sets })
        return;
      }
    }
  }

  updateSetRestTime = (setId, restTime) => {
    const { sets } = this.state;
    const restTimeInt = parseInt(restTime);
    
    for (let i = 0; i < sets.length; i++) {
      if (sets[i].id === setId) {
        sets[i].restTime = restTimeInt >= 0 ? restTimeInt : 0;
        this.setState({ sets })
        return;
      }
    }
  }

  addSetExercise = (setId) => {
    const { sets } = this.state;
    
    for (let i = 0; i < sets.length; i++) {
      if (sets[i].id === setId) {
        sets[i].exercises.push({
          id: uniqueId('set-exercise-'),
          title: null,
          duration: 0,
          restTime: 0
        })
        this.setState({ sets })
        return;
      }
    }
  }

  removeSetExercise = (setId, setExerciseId) => {
    const { sets } = this.state;

    for (let i = 0; i < sets.length; i++) {
      if (sets[i].id === setId) {
        sets[i].exercises = sets[i].exercises.filter(exercise => exercise.id !== setExerciseId);
        this.setState({ sets })
        return;
      }
    }    
  }

  updateSetExerciseTitle = (setId, exerciseId, title) => {
    const { sets } = this.state;
    
    for (let i = 0; i < sets.length; i++) {
      if (sets[i].id === setId) {
        for (let j = 0; j < sets[i].exercises.length; j++) {
          if (sets[i].exercises[j].id === exerciseId) {
            sets[i].exercises[j].title = title;
            this.setState({ sets })
            return;
          }
        }
      }
    }
  }

  updateSetExerciseDuration = (setId, exerciseId, duration) => {
    const { sets } = this.state;
    const durationInt = parseInt(duration);
    
    for (let i = 0; i < sets.length; i++) {
      if (sets[i].id === setId) {
        for (let j = 0; j < sets[i].exercises.length; j++) {
          if (sets[i].exercises[j].id === exerciseId) {
            sets[i].exercises[j].duration = durationInt > 0 ? durationInt : 0;
            this.setState({ sets })
            return;
          }
        }
      }
    }
  }

  updateSetExerciseRestTime = (setId, exerciseId, restTime) => {
    const { sets } = this.state;
    const restTimeInt = parseInt(restTime);
    
    for (let i = 0; i < sets.length; i++) {
      if (sets[i].id === setId) {
        for (let j = 0; j < sets[i].exercises.length; j++) {
          if (sets[i].exercises[j].id === exerciseId) {
            sets[i].exercises[j].restTime = restTimeInt > 0 ? restTimeInt : 0;
            this.setState({ sets })
            return;
          }
        }
      }
    }
  }

  render() {
    const { workoutTitle, sets } = this.state;
    const beepIntervals = [0]

    sets.forEach(set => {
      for (let i = 0; i < set.repetitions; i++) {
        set.exercises.forEach(exercise => {
          beepIntervals.push(last(beepIntervals) + exercise.duration);
          beepIntervals.push(last(beepIntervals) + exercise.restTime);
        })
        beepIntervals.push(last(beepIntervals) + set.restTime);
      }
    })

    return (
      <div className="container">
        <div className="row">
          <div className="col formContainer">
          <form className="m-0 w-100 bg-white py-4 px-5 rounded-lg shadow" onSubmit={this.handleSubmit} noValidate>
            <h2 className="mb-3">Create workout</h2>
            <div className="form-group">
              <input type="text" className="form-control" id="workoutTitle" placeholder={workoutTitle} onChange={this.setWorkoutTitle} />
            </div>

            { sets && sets.map((set, setIndex) => {
              const setCollapse = `collapse-${set.id}`;
              const setTitlePlaceholder = set.title ? set.title : `Set ${setIndex + 1}`;

              return (
                <div className="form-group mt-4 border rounded-lg p-3" key={set.id}>
                  <div className="form-row">
                    <div className="form-group col mb-0">
                      <button className="btn btn-primary" data-toggle="collapse" data-target={`#${setCollapse}`}
                        aria-expanded="true" aria-controls={setCollapse}>{setTitlePlaceholder}</button>
                    </div>
                    <div className="form-group col-auto mb-0">
                      <button className="btn btn-secondary" onClick={() => this.removeSet(set.id)}>Remove set</button>
                    </div>
                  </div>
                  <div className="collapse show" id={setCollapse}>
                    <div className="form-row">
                      <div className="form-group col mt-3">
                        <input type="text" className="form-control" id={set.id}
                          placeholder={setTitlePlaceholder}
                          onChange={(e) => this.updateSetTitle(set.id, e.target.value)} />
                      </div>
                    </div>
                    <div className="form-row">
                      <div className="form-group col">
                        <label htmlFor={`${set.id}-repetitions`}>Repetitions</label>
                        <input type="number" className="form-control" value={set.repetitions} min={1} id={`${set.id}-repetitions`}
                          onChange={(e) => this.updateSetRepetitions(set.id, e.target.value)} />
                      </div>
                      <div className="form-group col-auto d-flex flex-column justify-content-end">
                        <button className="btn btn-secondary iterator-button" onClick={() => this.updateSetRepetitions(set.id, set.repetitions - 1 )}>-1</button>
                      </div>
                      <div className="form-group col-auto d-flex flex-column justify-content-end">
                        <button className="btn btn-secondary iterator-button" onClick={() => this.updateSetRepetitions(set.id, set.repetitions + 1 )}>+1</button>
                      </div>
                    </div>
                    <div className="form-row">
                      <div className="form-group col">
                        <label htmlFor={`${set.id}-restTime`}>Rest time</label>
                        <input type="number" className="form-control" value={set.restTime} min={0} id={`${set.id}-restTime`}
                          onChange={(e) => this.updateSetRestTime(set.id, e.target.value)} />
                      </div>
                      <div className="form-group col-auto d-flex flex-column justify-content-end">
                        <button className="btn btn-secondary iterator-button" onClick={() => this.updateSetRestTime(set.id, set.restTime - 5 )}>-5s</button>
                      </div>
                      <div className="form-group col-auto d-flex flex-column justify-content-end">
                        <button className="btn btn-secondary iterator-button" onClick={() => this.updateSetRestTime(set.id, set.restTime + 5 )}>+5s</button>
                      </div>
                    </div>

                    { set.exercises && set.exercises.map((exercise, exerciseIndex) => {
                      const exerciseCollapse = `collapse-${exercise.id}`;
                      const exerciseTitlePlaceholder = exercise.title ? exercise.title : `Exercise ${exerciseIndex + 1}`;

                      return (
                        <div className="form-group mt-4" key={exercise.id}>
                          <div className="form-row">
                            <div className="form-group col mb-0">
                              <button className="btn btn-primary" data-toggle="collapse" data-target={`#${exerciseCollapse}`}
                                aria-expanded="true" aria-controls={exerciseCollapse}>{exerciseTitlePlaceholder}</button>
                            </div>
                            <div className="form-group col-auto mb-0">
                              <button className="btn btn-secondary" onClick={() => this.removeSetExercise(set.id, exercise.id)}>Remove set</button>
                            </div>
                          </div>
                          <div className="collapse show" id={exerciseCollapse}>
                            <div className="form-row">
                              <div className="form-group col mt-3">
                                <input type="text" className="form-control" id={exercise.id}
                                  placeholder={exerciseTitlePlaceholder}
                                  onChange={(e) => this.updateSetExerciseTitle(set.id, exercise.id, e.target.value )} />
                              </div>
                            </div>
                            <div className="form-row">
                              <div className="form-group col">
                                <label htmlFor={`${exercise.id}-duration`}>Duration</label>
                                <input type="number" className="form-control" value={exercise.duration} min={0} id={`${exercise.id}-duration`}
                                  onChange={(e) => this.updateSetExerciseDuration(set.id, exercise.id, e.target.value )} />
                              </div>
                              <div className="form-group col-auto d-flex flex-column justify-content-end">
                                <button className="btn btn-secondary iterator-button" onClick={() => this.updateSetExerciseDuration(set.id, exercise.id, exercise.duration - 5 )}>-5s</button>
                              </div>
                              <div className="form-group col-auto d-flex flex-column justify-content-end">
                                <button className="btn btn-secondary iterator-button" onClick={() => this.updateSetExerciseDuration(set.id, exercise.id, exercise.duration + 5 )}>+5s</button>
                              </div>
                            </div>
                            <div className="form-row">
                              <div className="form-group col">
                                <label htmlFor={`${exercise.id}-restTime`}>Rest time</label>
                                <input type="number" className="form-control" value={exercise.restTime} min={0} id={`${exercise.id}-restTime`}
                                  onChange={(e) => this.updateSetExerciseRestTime(set.id, exercise.id, e.target.value )} />
                              </div>
                              <div className="form-group col-auto d-flex flex-column justify-content-end">
                                <button className="btn btn-secondary iterator-button" onClick={() => this.updateSetExerciseRestTime(set.id, exercise.id, exercise.restTime - 5 )}>-5s</button>
                              </div>
                              <div className="form-group col-auto d-flex flex-column justify-content-end">
                                <button className="btn btn-secondary iterator-button" onClick={() => this.updateSetExerciseRestTime(set.id, exercise.id, exercise.restTime + 5 )}>+5s</button>
                              </div>
                            </div>
                          </div>
                        </div>
                      )
                    })}
                    <button className="btn btn-primary mt-2" onClick={() => this.addSetExercise(set.id)}>Add exercise</button>
                  </div>
                </div>
              )
            })}
            <div className="form-group">
              <button className="btn btn-primary" onClick={this.addSet}>Add set</button>
            </div>

            <div className="form-group mt-5">
              <button className="btn btn-primary"
                onClick={this.createWorkout}>Create workout</button>
            </div>
          </form>
          </div>
          <div className="col timerContainer">
            <Timer beepIntervals={beepIntervals} />
            <div className="card bg-dark shadow p-2">
              <table className="table table-stiped table-dark m-0">
                <thead>
                  <tr>
                    <th scope="col"><h5>{workoutTitle}</h5></th>
                    <th scope="col" className="text-center"><h5>Duration</h5></th>
                    <th scope="col" className="text-center"><h5>Rest Time</h5></th>
                  </tr>
                </thead>
                <tbody>
                  { sets && sets.map((set, setIndex) => {
                    const setTitlePlaceholder = set.title ? set.title : `Set ${setIndex + 1}`;
                    const setTotalTime = set.repetitions * (set.restTime + set.exercises.reduce((sum, { duration, restTime }) => sum + duration + restTime, 0));

                    return (
                      <Fragment key={set.id}>
                        <tr>
                          <td>{`${setTitlePlaceholder} – ${set.repetitions} repetition${set.repetitions === 1 ? '' : 's'}`}</td>
                          <td className="text-center">{moment(setTotalTime * 1000).format('mm:ss')}</td>
                          <td className="text-center">{moment(set.restTime * 1000).format('mm:ss')}</td>
                        </tr>
                        { set.exercises && set.exercises.map((exercise, exerciseIndex) => {
                          const exerciseTitlePlaceholder = exercise.title ? exercise.title : `Exercise ${exerciseIndex + 1}`;

                          return (
                            <tr key={exercise.id}>
                              <td className="workout-exercise">{exerciseTitlePlaceholder}</td>
                              <td className="text-center">{moment(exercise.duration * 1000).format('mm:ss')}</td>
                              <td className="text-center">{moment(exercise.restTime * 1000).format('mm:ss')}</td>
                            </tr>
                          )
                        })}
                      </Fragment>
                    )
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default WorkoutTimer
