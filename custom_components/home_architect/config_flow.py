"""Config flow for Home Architect integration."""
from __future__ import annotations

import voluptuous as vol
from homeassistant import config_entries
from homeassistant.core import callback
import homeassistant.helpers.config_validation as cv

from .const import DOMAIN, CONF_SHOW_SIDEBAR_PANEL, DEFAULT_SHOW_SIDEBAR_PANEL


class HomeArchitectConfigFlow(config_entries.ConfigFlow, domain=DOMAIN):
    """Handle a config flow for Home Architect."""

    VERSION = 1

    async def async_step_user(self, user_input=None):
        """Handle the initial step."""
        if self._async_current_entries():
            return self.async_abort(reason="already_configured")

        if user_input is not None:
            return self.async_create_entry(title="Home Architect", data=user_input)

        data_schema = vol.Schema(
            {
                vol.Required(
                    CONF_SHOW_SIDEBAR_PANEL, default=DEFAULT_SHOW_SIDEBAR_PANEL
                ): bool,
            }
        )

        return self.async_show_form(step_id="user", data_schema=data_schema)

    @staticmethod
    @callback
    def async_get_options_flow(config_entry):
        """Get options flow handler."""
        return HomeArchitectOptionsFlow(config_entry)


class HomeArchitectOptionsFlow(config_entries.OptionsFlow):
    """Handle options flow for Home Architect."""

    def __init__(self, config_entry) -> None:
        self.config_entry = config_entry

    async def async_step_init(self, user_input=None):
        """Manage options."""
        if user_input is not None:
            return self.async_create_entry(title="", data=user_input)

        options = self.config_entry.options
        data_schema = vol.Schema(
            {
                vol.Required(
                    CONF_SHOW_SIDEBAR_PANEL,
                    default=options.get(
                        CONF_SHOW_SIDEBAR_PANEL, DEFAULT_SHOW_SIDEBAR_PANEL
                    ),
                ): bool,
            }
        )

        return self.async_show_form(step_id="init", data_schema=data_schema)
