
# Edit local /etc/hosts files to resolve some hostnames used on your application.
host { 'localhost.localdomain':
	ensure => 'present',
	target => '/etc/hosts',
	ip => '127.0.0.1',
	host_aliases => ['localhost','memcached','mysql']
}

# Setup stages so we can run certain tasks first or last
stage { 'first': }
stage { 'last': }
Stage['first'] -> Stage['main'] -> Stage['last']

# Setup local bin folder for script inclusion
file {'/home/vagrant/bin':
	ensure => 'link',
	target => '/vagrant/bin'
}


class {"remi":
	stage => first
}

package {[
	'man',
	'git',
	'zip',
	'unzip',
	'vim-enhanced',
	'nano',
	'ImageMagick',
	'giflib',
	'expat',
	'fontconfig'
]:
	ensure => latest
}

include '::ntp'

##################################################################################################
#  Iptables (Firewall) package and rules to allow ssh, http, https and dns services.
##################################################################################################

service { "iptables":
  ensure => "stopped",
}


##################################################################################################
#  Node
##################################################################################################

include nodejs

package {[
    'grunt-cli',
    'bower'
  ]:
  ensure => present,
  provider => 'npm'
}


##################################################################################################
#  Redis
##################################################################################################

class { 'redis':
  conf_port => '6380',
  conf_bind => '127.0.0.1',
  conf_logfile => '/opt/log/redis.log'
}

##################################################################################################
#  nginx
##################################################################################################

class { 'nginx': }

class nginx-setup {

	nginx::resource::vhost { 'crispin.dev':
		ensure     => present,
		proxy      => 'http://localhost:8000',
		access_log => '/opt/log/nginx.access.log',
		error_log  => '/opt/log/nginx.error.log'
	}

	nginx::resource::location { 'assets.crispin.dev':
		ensure   => present,
		vhost    => 'crispin.dev',
		location => '/assets/',
		www_root => '/srv/crispin/app/www',
	}

	file { '/etc/nginx/conf.d/default.conf':
		ensure   => 'absent',
		require  => Package['nginx'],
		notify   => Service["nginx"]
	}

}

include nginx-setup


##################################################################################################
#  MySQL Config
##################################################################################################

class { 'mysql::server':
	root_password => vagrant,
	log_error => '/opt/log/mysql.error.log'
}

mysql::db { 'crispin':
	user     => 'crispin',
	password => 'crispin',
	host     => 'localhost',
	grant    => ['ALL']
}


##################################################################################################
# Memcached Config
##################################################################################################

class { 'memcached':
	max_memory => 100,
	logfile    => '/opt/log/memcached.log'
}
