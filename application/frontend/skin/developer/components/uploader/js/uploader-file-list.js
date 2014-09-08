/**
 * Uploader File List
 *
 * @module ls/uploader/file-list
 *
 * @license   GNU General Public License, version 2
 * @copyright 2013 OOO "ЛС-СОФТ" {@link http://livestreetcms.com}
 * @author    Denis Shakhov <denis.shakhov@gmail.com>
 */

(function($) {
	"use strict";

	$.widget( "livestreet.lsUploaderFileList", {
		/**
		 * Дефолтные опции
		 */
		options: {
			uploader: $(),

			// Множественный выбор
			multiselect: true,

			// Множественный выбор только при нажатии на CTRL
			multiselect_ctrl: true,

			// Максимальная высота списка при отсутствии активного файла
			max_height: 113 * 3 + 15,

			// Ссылки
			urls: {
				load: aRouter['ajax'] + "media/load-gallery/"
			},

			// Селекторы
			selectors: {
				file: '.js-uploader-file'
			},

			// HTML
			// TODO: Move to template
			html: {
				file:
					'<li class="uploader-file js-uploader-file">' +
						'<div class="progress">' +
							'<div class="progress-value js-uploader-file-progress-value"></div>' +
							'<span class="progress-info js-uploader-file-progress-label">0%</span>' +
						'</div>' +
					'</li>'
			},
		},

		/**
		 * Конструктор
		 *
		 * @constructor
		 * @private
		 */
		_create: function () {
			this.elements = {};

			this.files = null;
			this.activeFile = $();

			this.resizeHeight();
		},

		/**
		 * Подгрузки списка файлов
		 */
		load: function() {
			this.getFiles().lsUploaderFile( 'destroy' );
			this.element.empty().addClass( ls.options.classes.states.loading );

			ls.ajax.load(
				this.option( 'urls.load' ),
				this.option( 'uploader' ).lsUploader( 'option', 'params' ),
				this.onLoad.bind( this )
			);
		},

		/**
		 * Коллбэк вызываемый после подгрузки списка файлов
		 */
		onLoad: function( respone ) {
			this.element.removeClass( ls.options.classes.states.loading ).html( $.trim( respone.html ) );
			this.option( 'uploader' ).lsUploader( respone.html ? 'markAsNotEmpty' : 'markAsEmpty' );
			this.getFiles().lsUploaderFile({ uploader: this.option( 'uploader' ) });
		},

		/**
		 * Добавляет файл в список
		 */
		addFile: function( data ) {
			data.context = $( this.option( 'html.file' ) )
				.lsUploaderFile({ uploader: this.option( 'uploader' ) })
				.lsUploaderFile( 'uploading' );

			this.option( 'uploader' ).lsUploader( 'markAsNotEmpty' );
			this.element.prepend( data.context );
		},

		/**
		 * Получает активный файл
		 */
		getActiveFile: function() {
			return this.getFiles().filter( '.' + ls.options.classes.states.active );
		},

		/**
		 * Получает выделенные файлы
		 */
		getSelectedFiles: function() {
			return this.getFiles().filter(function () {
				return $( this ).lsUploaderFile( 'getState', 'selected' );
			});
		},

		/**
		 * Убирает выделение со всех файлов
		 */
		clearSelected: function() {
			this.getFiles().lsUploaderFile( 'unselect' );
		},

		/**
		 * Делает активным последний выделенный файл
		 */
		activateNextFile: function() {
			var last = this.getSelectedFiles().last();

			if ( last.length ) {
				last.lsUploaderFile( 'activate' );
			} else {
				this.option( 'uploader' ).lsUploader( 'getElement', 'info' ).lsUploaderInfo( 'empty' );
			}
		},

		/**
		 * Изменяет высоту списка так, чтобы она была равна высоте сайдбара
		 */
		resizeHeight: function() {
			var aside = this.option( 'uploader' ).lsUploader( 'getElement', 'aside' ),
				asideHeight = aside.outerHeight();

			if ( ! aside.hasClass( 'is-empty' ) && asideHeight > this.option( 'max_height' ) ) {
				this.element.css( 'max-height', asideHeight );
			} else {
				this.element.css( 'max-height', this.option( 'max_height' ) );
			}
		},

		/**
		 * Получает файлы
		 */
		getFiles: function() {
			return this.element.find( this.option( 'selectors.file' ) );
		}
	});
})(jQuery);