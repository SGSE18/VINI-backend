create table users
(
  id             int identity
    primary key,
  email          varchar(255) not null
    unique,
  password       varchar(255) not null,
  privateKey     varchar(64)  not null,
  authorityLevel tinyint      not null,
  forename       varchar(100) not null,
  surname        varchar(100) not null,
  companyName    varchar(100) not null,
  creationDate   datetime     not null,
  blocked        bit          not null,
  publicKey      varchar(64)  not null
)
go

create table kfz
(
  vin          varchar(17)  not null
    primary key
    unique,
  publicKey    varchar(255) not null
    unique,
  creationDate datetime     not null,
  privateKey   varchar(255) not null,
  headTx       varchar(255)
)
go

create table annulment_transactions
(
  id              int identity
    primary key,
  transactionHash varchar(255) not null
    unique,
  pending         bit          not null,
  creationDate    datetime     not null,
  user_id         int          not null
    constraint annulment_transactions_users_id_fk
    references users,
  vin             varchar(17)  not null
    constraint annulment_transactions_kfz_vin_fk
    references kfz,
  applicant       varchar(255)
)
go

create table bearer_tokens
(
  token      varchar(255) not null
    primary key
    unique,
  user_id    int          not null
    unique
    references users,
  expiration datetime     not null
)
go

