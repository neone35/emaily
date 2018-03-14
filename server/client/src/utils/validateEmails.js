const emailRe =
    /^(([^<>()\]\\.,;:\s@"]+(\.[^<>()\]\\.,;:\s@"]+)*)|(".+"))@(([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export default (emails) => {
    // trim - remove white space, filter - put false
    if (emails !== " ") {
        const invalidEmails = emails
            .split(',')
            .map(email => email.trim())
            .filter(email => emailRe.test(email) === false);

        for (var i = 0; i < invalidEmails.length; i++) {
            if (invalidEmails[i].length) {
                // console.log(invalidEmails[i]);
                // template strings use backticks
                return `These emails are invalid: ${invalidEmails}`;
            }
        }
    }

    return null;
};
