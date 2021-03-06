import { Class } from 'meteor/jagi:astronomy';

export const Queue = Class.create({
    name: 'Queue',
    fields: {
        outstanding_requests: {
            type: [String],
            default: [],
        },
        queue_of_students: {
            type: [String],
            default: [],
        },
        queue_of_instructors: {
            type: [String],
            default: [],
        },
        queue_of_TAs: {
            type: [String],
            default: [],
        },
        queue_of_visiting: {
            type: [String],
            default: [],
        },
        queue_of_professors: {
            type: [String],
            default: [],
        }
    },
    helpers: {
        get_all_queue: function () {
            return this.outstanding_requests.concat(
                this.queue_of_students.concat(
                    this.queue_of_instructors.concat(
                        this.queue_of_TAs.concat(
                            this.queue_of_visiting.concat(
                                this.queue_of_professors
                            )
                        )
                    )
                )
            )
        },
        getQueueWithoutOutstand: function () {
                return this.queue_of_students.concat(
                    this.queue_of_instructors.concat(
                        this.queue_of_TAs.concat(
                            this.queue_of_visiting.concat(
                                this.queue_of_professors
                            )
                        )
                    )
                )
        },
        in_queue: function (id) {

            let a = this.get_all_queue().indexOf(id);
            return a >= 0;
        },
        get_queue: function (group) {
            if (group === "Student"){
                return this.queue_of_students;
            }
            else if (group === "Instructor"){
                return this.queue_of_instructors;
            }
            else if (group === "TA"){
                return this.queue_of_TAs;
            }
            else if (group === "Visiting"){
                return this.queue_of_visiting;
            }
            else if (group === "Professor"){
                return this.queue_of_professors;
            }
            else throw Error("group " + group + " doesn\'t exist");

        }
    }
});
