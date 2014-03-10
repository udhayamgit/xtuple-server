var os = require('os'),
  posix = require('posix'),
  phi = (Math.sqrt(5) + 1) / 2;

/**
 * @module defaults
 * All size values in megabytes.
 * */
module.exports = {
  env: {
    phi: phi,
    stacklimit: posix.getrlimit('stack').soft,
    platform: os.platform(),
    MB: 1048576,
    GB: Math.pow(1048576, 2),

    /**
     * <http://www.postgresql.org/docs/9.3/static/kernel-resources.html>
     * Docs: "if pages, ceil(SHMMAX/PAGE_SIZE)" ...and "A page is almost always
     * 4096 bytes except in unusual kernel configurations".
     */
    shmmax: os.totalmem(),
    shmall: os.totalmem() / 4096
  },

  /**
   * Default resource allocations for different slot types.
   */
  slot: {
    /**
     * default values for a base 'slot' which is used as a frame of reference
     * for provisioning and tuning.
     * @const
     */
    base: {
      version: 9.1,
      locale: 'en_US.UTF-8',
      max_connections: 128,
      work_mem: 2,
      temp_buffers: 16,
      maintenance_work_mem: 64,
      ram: 512
    },

    /** production slot values */
    production: {
      ram:  1024,
    },

    /**
     * Staging slots will include any quickstart or pilot databases
     */
    staging: {
      ram: 384,
    },

    /**
     * Slot type used for demo-type databases, quickstart, or possibly free
     * trials.
     */
    demo: {
      ram: 128,
      max_connections: 16,
      maintenance_work_mem: 16,
    }
  },

  hba: {

  }
};