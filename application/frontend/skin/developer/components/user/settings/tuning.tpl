{**
 * Настройка уведомлений
 *}

{hook run='settings_tuning_begin'}

<form action="{router page='settings'}tuning/" method="POST" enctype="multipart/form-data">
	{hook run='form_settings_tuning_begin'}

	{include 'components/field/field.hidden.security_key.tpl'}

	<fieldset>
		<legend>{lang name='user.settings.tuning.email_notices'}</legend>

		{include 'components/field/field.checkbox.tpl'
				 sName     = 'settings_notice_new_topic'
				 bChecked  = $oUserCurrent->getSettingsNoticeNewTopic() != 0
				 bNoMargin = true
				 sLabel    = {lang name='user.settings.tuning.fields.new_topic'}}

		{include 'components/field/field.checkbox.tpl'
				 sName     = 'settings_notice_new_comment'
				 bChecked  = $oUserCurrent->getSettingsNoticeNewComment() != 0
				 bNoMargin = true
				 sLabel    = {lang name='user.settings.tuning.fields.new_comment'}}

		{include 'components/field/field.checkbox.tpl'
				 sName     = 'settings_notice_new_talk'
				 bChecked  = $oUserCurrent->getSettingsNoticeNewTalk() != 0
				 bNoMargin = true
				 sLabel    = {lang name='user.settings.tuning.fields.new_talk'}}

		{include 'components/field/field.checkbox.tpl'
				 sName     = 'settings_notice_reply_comment'
				 bChecked  = $oUserCurrent->getSettingsNoticeReplyComment() != 0
				 bNoMargin = true
				 sLabel    = {lang name='user.settings.tuning.fields.reply_comment'}}

		{include 'components/field/field.checkbox.tpl'
				 sName     = 'settings_notice_new_friend'
				 bChecked  = $oUserCurrent->getSettingsNoticeNewFriend() != 0
				 bNoMargin = true
				 sLabel    = {lang name='user.settings.tuning.fields.new_friend'}}
	</fieldset>

	<fieldset>
		<legend>{lang name='user.settings.tuning.general'}</legend>

		{foreach $aTimezoneList as $timezone}
			{$timezones[] = [
				'value' => $timezone,
				'text' => $aLang.date.timezones[ $timezone ]
			]}
		{/foreach}

		{include 'components/field/field.select.tpl'
				 sName          = 'settings_general_timezone'
				 sLabel         = {lang name='user.settings.tuning.fields.timezone.label'}
				 aItems         = $timezones
				 sSelectedValue = $_aRequest.settings_general_timezone}
	</fieldset>

	{hook run='form_settings_tuning_end'}

    {include 'components/button/button.tpl' name='submit_settings_tuning' text=$aLang.common.save mods='primary'}
</form>

{hook run='settings_tuning_end'}