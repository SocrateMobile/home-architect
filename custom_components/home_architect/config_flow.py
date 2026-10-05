"""Config flow for Home Architect integration."""
from __future__ import annotations

from typing import Any

import voluptuous as vol

from homeassistant.config_entries import (
    ConfigEntry,
    ConfigFlow,
    ConfigFlowResult,
    OptionsFlow,
)
from homeassistant.core import callback

from .const import CONF_SHOW_SIDEBAR_PANEL, DEFAULT_SHOW_SIDEBAR_PANEL, DOMAIN, NAME
from .panel import panel_enabled


class HomeArchitectConfigFlow(ConfigFlow, domain=DOMAIN):
    """Handle a config flow for Home Architect."""

    VERSION = 1

    async def async_step_user(self, user_input: dict[str, Any] | None = None) -> ConfigFlowResult:
        """Handle the initial step."""
        if self._async_current_entries():
            return self.async_abort(reason="single_instance_allowed")

        if user_input is not None:
            return self.async_create_entry(title=NAME, data=user_input)

        return self.async_show_form(
            step_id="user",
            data_schema=vol.Schema(
                {
                    vol.Required(
                        CONF_SHOW_SIDEBAR_PANEL, default=DEFAULT_SHOW_SIDEBAR_PANEL
                    ): bool,
                }
            ),
        )

    @staticmethod
    @callback
    def async_get_options_flow(config_entry: ConfigEntry) -> HomeArchitectOptionsFlow:
        """Get options flow handler (self.config_entry est fourni par HA)."""
        return HomeArchitectOptionsFlow()


class HomeArchitectOptionsFlow(OptionsFlow):
    """Handle options flow for Home Architect."""

    async def async_step_init(self, user_input: dict[str, Any] | None = None) -> ConfigFlowResult:
        """Manage options."""
        if user_input is not None:
            return self.async_create_entry(title="", data=user_input)

        return self.async_show_form(
            step_id="init",
            data_schema=vol.Schema(
                {
                    vol.Required(
                        CONF_SHOW_SIDEBAR_PANEL, default=panel_enabled(self.config_entry)
                    ): bool,
                }
            ),
        )
