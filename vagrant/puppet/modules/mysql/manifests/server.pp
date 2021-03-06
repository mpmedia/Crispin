# Class: mysql::server:  See README.md for documentation.
class mysql::server (
  #Deprecated.
  $enabled                 = undef,
  $manage_service          = undef,
  #
  $config_file             = $mysql::params::config_file,
  $log_error               = $mysql::params::log_error,
  $manage_config_file      = $mysql::params::manage_config_file,
  $old_root_password       = $mysql::params::old_root_password,
  $override_options        = {},
  $package_ensure          = $mysql::params::server_package_ensure,
  $package_name            = $mysql::params::server_package_name,
  $purge_conf_dir          = $mysql::params::purge_conf_dir,
  $remove_default_accounts = false,
  $restart                 = $mysql::params::restart,
  $root_group              = $mysql::params::root_group,
  $root_password           = $mysql::params::root_password,
  $service_enabled         = $mysql::params::server_service_enabled,
  $service_manage          = $mysql::params::server_service_manage,
  $service_name            = $mysql::params::server_service_name,
  $service_provider        = $mysql::params::server_service_provider
) inherits mysql::params {

  # Deprecated parameters.
  if $enabled {
    crit('This parameter has been renamed to service_enabled.')
    $real_service_enabled = $enabled
  } else {
    $real_service_enabled = $service_enabled
  }
  if $manage_service {
    crit('This parameter has been renamed to service_manage.')
    $real_service_manage = $manage_service
  } else {
    $real_service_manage = $service_manage
  }

  # Create a merged together set of options.  Rightmost hashes win over left.
  $options = mysql_deepmerge($mysql::params::default_options, $override_options)

  Class['mysql::server::root_password'] -> Mysql::Db <| |>

  include '::mysql::server::install'
  include '::mysql::server::config'
  include '::mysql::server::service'
  include '::mysql::server::root_password'

  if $remove_default_accounts {
    class { '::mysql::server::account_security':
      require => Anchor['mysql::server::end'],
    }
  }

  anchor { 'mysql::server::start': }
  anchor { 'mysql::server::end': }

  Anchor['mysql::server::start'] ->
  Class['mysql::server::install'] ->
  Class['mysql::server::config'] ->
  Class['mysql::server::service'] ->
  Class['mysql::server::root_password'] ->
  Anchor['mysql::server::end']

}
