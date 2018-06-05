import dbConnection from "./msSqlWrapper";

function saveAccessToken(token, userID, callback) {

  //TODO: bearer_token Tabelle anlegen (token, user_id)
  //TODO: Auf msSQL Syntax ändern ("ON DUPLICATE" passt nicht)
  // ON DUPLICATE gibt es in MSSQL nicht, wird durch eine Query ersetzt
  //const insertTokenQuery = `INSERT INTO bearer_tokens (token, user_id) VALUES ('${token}', ${userID}) ON DUPLICATE KEY UPDATE token = '${token}';`;
    const insertTokenQuery = `    
    begin tran
    if exists (select * from bearer_tokens with (updlock,serializable) where token = '${token}')
    begin
    update bearer_tokens
    set token = '${token}'
        where token = '${token}';
    end
    else
    begin
    insert into bearer_tokens (token, user_id) values ('${token}', ${userID});
    end
    commit tran`;

  dbConnection.query(insertTokenQuery, callback);
}

function getUserIDFromAccessToken(token, callback) {

  const getUserIDQuery = `SELECT user_id FROM bearer_tokens WHERE token = '${token}';`;

  dbConnection.query(getUserIDQuery, (err, resultValues) => {

    const userID = resultValues != null && resultValues.length === 1 ? resultValues[0] : null;

    callback(userID);
  });
}


module.exports = {
  "saveAccessToken": saveAccessToken,
  "getUserIDFromAccessToken": getUserIDFromAccessToken
};